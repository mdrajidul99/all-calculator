# Android Release & Signing Information

This document contains essential metadata and release signing specifications for **All Calculator** to ensure smooth distribution and future updates on Google Play Store and third-party Android repositories.

---

## 1. General Application Specifications

- **Application Name:** All Calculator
- **Package Name (Application ID):** `com.mrsengineersbd.allcalculator`
- **Developer Organization:** MRS Engineers BD
- **Developer Contact:** `mrs.engineers.bd26@gmail.com`
- **Current Version Name:** `1.1.0`
- **Current Version Code:** `2`
- **Target SDK Level:** `33` (Android 13)
- **Minimum SDK Level:** `21` (Android 5.0 Lollipop)
- **Architecture / Mode:** 100% Offline Standalone Application
- **Build Types Produced:**
  - Release APK: `All Final Apps/Final_App.apk`
  - Release AAB: `All Final Apps/Final_App.aab`
  - Mirror APK: `All-Calculator/Final_Apps.apk`

---

## 2. Cryptographic Signing & Certificate Identity

The application is cryptographically signed using an established 2048-bit RSA key valid through the year **2054**. This signing identity ensures continuity across all future app updates.

- **Keystore File Location:** `android/release.keystore`
- **Key Alias:** `allcalculator`
- **Certificate Subject:** `CN=MRS Engineers BD, OU=Mobile, O=MRS Engineers BD, L=Dhaka, ST=Dhaka, C=BD`
- **Key Algorithm:** `2048-bit RSA` with `SHA256withRSA` signature scheme
- **Validity:** 10,000 days (Until February 19, 2054 UTC)

### Certificate Fingerprints

- **SHA-256 Fingerprint:**
  ```
  6D:18:E1:57:AA:76:74:51:FF:55:0C:6F:73:08:68:4A:4F:16:7D:C1:4F:BC:B3:C8:28:EA:6A:7B:5B:64:73:EA
  ```

- **SHA-1 Fingerprint:**
  ```
  0D:8E:0E:34:16:51:DA:D5:A1:2A:40:76:6E:EA:F8:59:A3:8C:77:C3
  ```

---

## 3. How to Extract Fingerprints in Future

To inspect or verify the fingerprints at any time, run:

```bash
keytool -list -v -keystore android/release.keystore -alias allcalculator
```

---

## 4. How to Publish & Update on Google Play Store

1. **For Initial Upload:**
   - Use `All Final Apps/Final_App.aab` (Android App Bundle). Google Play requires the `.aab` format for all new app releases.
   - Google Play will automatically generate optimized, device-tailored APKs for end users.

2. **For Subsequent Updates:**
   - Always **increment `android:versionCode`** in `android/app/src/main/AndroidManifest.xml` (e.g., from `2` to `3`, `4`, etc.). Google Play will reject any upload that does not increment the version code.
   - Update `android:versionName` appropriately (e.g., `1.1.1` or `1.2.0`).
   - Run `bash android/build.sh` to generate the new signed APK and AAB.
   - Upload the newly created `All Final Apps/Final_App.aab` to the Google Play Console release track.

3. **Keystore Security & Backup:**
   - **CRITICAL:** Always securely back up `android/release.keystore` in a safe, encrypted storage location (e.g., private password manager, secure offline drive).
   - If the keystore file is lost and Google Play App Signing is not configured to allow key reset, updates to the app cannot be published under the same package name.
   - Never share, commit, or publicly distribute the keystore password.

---

## 5. Verification Commands

Both release artifacts can be verified independently:

- **Verify APK signatures (v1, v2, v3):**
  ```bash
  apksigner verify --verbose "All Final Apps/Final_App.apk"
  ```

- **Verify AAB completeness with bundletool:**
  ```bash
  java -jar /usr/local/bin/bundletool.jar build-apks --bundle="All Final Apps/Final_App.aab" --output=test.apks --ks=android/release.keystore --ks-key-alias=allcalculator
  ```
