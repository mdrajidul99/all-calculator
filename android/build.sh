#!/bin/bash
set -e

echo "=== Building All Calculator Release Android APK & AAB ==="

mkdir -p "All Final Apps" "All-Calculator" android/build

# 1. Build offline web assets
echo "[1/7] Building offline web assets with Vite..."
npm run build:android

# 2. Compile Java classes
echo "[2/7] Compiling Java classes..."
rm -rf android/build/classes android/build/classes.dex
mkdir -p android/build/classes
javac -encoding UTF-8 -source 8 -target 8 \
  -cp /usr/lib/android-sdk/platforms/android-23/android.jar \
  -d android/build/classes \
  android/app/src/main/java/com/mrsengineersbd/allcalculator/*.java

# 3. Create Dalvik DEX bytecode
echo "[3/7] Generating classes.dex..."
/usr/bin/dalvik-exchange --dex --output=android/build/classes.dex android/build/classes

# 4. Package Android APK resources with aapt
echo "[4/7] Packaging APK resources with aapt..."
rm -f android/build/unaligned.apk android/build/aligned.apk
aapt package -f \
  -M android/app/src/main/AndroidManifest.xml \
  -S android/app/src/main/res \
  -A android/app/src/main/assets \
  -I /usr/lib/android-sdk/platforms/android-23/android.jar \
  -F android/build/unaligned.apk

# 5. Add classes.dex into APK
echo "[5/7] Embedding classes.dex into APK..."
(cd android/build && aapt add unaligned.apk classes.dex)

# 6. Align and Sign APK
echo "[6/7] Aligning and signing release APK..."
zipalign -v -p 4 android/build/unaligned.apk android/build/aligned.apk

if [ ! -f android/release.keystore ]; then
  keytool -genkeypair -v -keystore android/release.keystore \
    -alias allcalculator -keyalg RSA -keysize 2048 -validity 10000 \
    -storepass allcalculator123 -keypass allcalculator123 \
    -dname "CN=MRS Engineers BD, OU=Mobile, O=MRS Engineers BD, L=Dhaka, ST=Dhaka, C=BD"
fi

rm -f "All Final Apps/Final_App.apk" "All-Calculator/Final_Apps.apk" "All-Calculator/Update-Apps.apk"
apksigner sign --ks android/release.keystore \
  --ks-pass pass:allcalculator123 \
  --key-pass pass:allcalculator123 \
  --out "All Final Apps/Final_App.apk" \
  android/build/aligned.apk

# Mirror copies
cp "All Final Apps/Final_App.apk" "All-Calculator/Final_Apps.apk"
cp "All Final Apps/Final_App.apk" "All-Calculator/Update-Apps.apk"

# 7. Build and Sign Android App Bundle (.aab)
echo "[7/7] Generating and signing Android App Bundle (.aab)..."
rm -rf android/build/compiled_res.zip android/build/proto_base.apk android/build/bundle_module android/build/bundle_extracted android/build/base.zip
mkdir -p android/build/bundle_module/manifest android/build/bundle_module/dex

AAPT2_BIN="android/tools/aapt2"
BUNDLETOOL_JAR="android/tools/bundletool.jar"

$AAPT2_BIN compile --dir android/app/src/main/res -o android/build/compiled_res.zip

$AAPT2_BIN link --proto-format \
  -o android/build/proto_base.apk \
  -I /usr/lib/android-sdk/platforms/android-23/android.jar \
  --manifest android/app/src/main/AndroidManifest.xml \
  -A android/app/src/main/assets \
  --auto-add-overlay \
  android/build/compiled_res.zip

unzip -q android/build/proto_base.apk -d android/build/bundle_extracted
mv android/build/bundle_extracted/AndroidManifest.xml android/build/bundle_module/manifest/
if [ -d android/build/bundle_extracted/res ]; then mv android/build/bundle_extracted/res android/build/bundle_module/; fi
if [ -f android/build/bundle_extracted/resources.pb ]; then mv android/build/bundle_extracted/resources.pb android/build/bundle_module/; fi
if [ -d android/build/bundle_extracted/assets ]; then mv android/build/bundle_extracted/assets android/build/bundle_module/; fi
cp android/build/classes.dex android/build/bundle_module/dex/

(cd android/build/bundle_module && jar c0Mf ../base.zip *)

rm -f android/build/unsigned_bundle.aab "All Final Apps/Final_App.aab"
java -jar $BUNDLETOOL_JAR build-bundle --modules=android/build/base.zip --output=android/build/unsigned_bundle.aab

# Sign AAB with jarsigner
jarsigner -keystore android/release.keystore \
  -storepass allcalculator123 \
  -keypass allcalculator123 \
  android/build/unsigned_bundle.aab \
  allcalculator

cp android/build/unsigned_bundle.aab "All Final Apps/Final_App.aab"

echo "=== Verifying Release APK ==="
apksigner verify --verbose "All Final Apps/Final_App.apk"

echo "=== Verifying Release AAB ==="
rm -f android/build/test_extracted.apks
java -jar $BUNDLETOOL_JAR build-apks \
  --bundle="All Final Apps/Final_App.aab" \
  --output=android/build/test_extracted.apks \
  --ks=android/release.keystore \
  --ks-pass=pass:allcalculator123 \
  --ks-key-alias=allcalculator \
  --key-pass=pass:allcalculator123

echo "=== BUILD SUCCESSFUL ==="
ls -lh "All Final Apps/Final_App.apk" "All Final Apps/Final_App.aab" "All-Calculator/Final_Apps.apk"
