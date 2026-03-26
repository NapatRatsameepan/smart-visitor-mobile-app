# Smart Visitor Mobile: Scan-In & Scan-Out Workflow

This document outlines the end-to-end process for managing visitors using OCR (Optical Character Recognition) and QR code technology.

---

## 1. Scan-In Phase (Entry)
The Scan-In process is divided into a 6-step guided workflow to ensure high-quality data collection and a professional entry slip for the guest.

### Step 1: Personal ID Capture
*   **Action:** The security guard uses the camera with a "Personal ID Skeleton" overlay.
*   **Goal:** Ensure the ID card is perfectly aligned for optimal OCR processing.

### Step 2: ID Confirmation
*   **Action:** Review the captured image.
*   **Logic:** If the image is blurry, the guard can select **"Retake" (อีกครั้ง)**. If clear, select **"Confirm" (ตกลง)**.

### Step 3: Vehicle Capture
*   **Action:** Capture the front of the guest's vehicle (License Plate + Brand).
*   **Logic:** No skeleton is used here to allow for different vehicle sizes.

### Step 4: Vehicle Confirmation
*   **Action:** Review the car image. Ensure the license plate is legible.

### Step 5: Data Processing & Review (AI/OCR)
*   **Backend Process:** Both images are sent to the API.
    *   **ID OCR:** Extracts Name, ID Number, and Address.
    *   **Vehicle OCR:** Extracts License Plate Number and Brand.
*   **Action:** The guard reviews the extracted data on a form and manually selects the **Visit Purpose** and **Target Department**.

### Step 6: Entry Slip & QR Printing
*   **Process:** The system generates a **Unique Visit ID** (e.g., `SV-20240818-0001`).
*   **Action:** A PDF is generated from an HTML template containing:
    *   **QR Code:** (Contains only the Unique Visit ID for security).
    *   **Guest Details:** Name, License Plate, and Entry Time.
*   **Printing:** The guard prints the slip for the guest using a mobile thermal printer or system printer.

---

## 2. Scan-Out Phase (Exit)
The Scan-Out process is designed for speed and security to prevent manual data entry errors.

### Step 1: QR Scanning
*   **Action:** When the guest leaves, the guard scans the QR code on the entry slip.
*   **Security:** The QR only contains the `Visit ID`. No private guest data is exposed if the slip is lost.

### Step 2: System Lookup
*   **Action:** The app sends the `Visit ID` to the server.
*   **Verification:** The server confirms the visitor is currently "On-Site" and displays their summary (Name/Plate) to the guard for a final visual check.

### Step 3: Checkout Completion
*   **Action:** The guard presses **"Complete Checkout"**.
*   **Result:** The system records the **Exit Time**, calculates the duration of the stay, and moves the record from "Active" to "History."

---

## 3. Technical Implementation Details

| Feature | Technology |
| :--- | :--- |
| **Camera** | `expo-camera` |
| **OCR/AI** | External API (e.g., Google Vision or Custom Backend) |
| **QR Generation** | `react-native-qrcode-svg` |
| **PDF/Printing** | `expo-print` (HTML to PDF) |
| **Navigation** | `expo-router` |
| **Security** | Unique Token-based QR (No PII in QR) |

---

## 4. Architectural Recommendations (Senior Developer Review)
To maintain a high-quality codebase as the app scales, the following architectural separations are recommended:

### A. Logic Extraction (Custom Hooks)
*   **`useRealTimeClock`**: Extract the Thai Buddhist calendar clock logic to a hook to be reused across all pages (Dashboard, History, etc.).
*   **`useCameraWorkflow`**: Manage the multi-step capture state (step, image storage, next/prev navigation) independently from the UI.

### B. UI Component Decoupling
*   **`StepHeader`**: Create a shared component for the Sub-Header (Back button + Progress Bar) to ensure consistency between Scan-In and Scan-Out pages.
*   **`IDSkeleton`**: Extract the complex overlay/corner styling logic to a separate component to clean up page code (~50 lines reduction).
*   **`CaptureControls`**: Standardize the capture button (Circle UI) and navigation buttons (Skip/Retake) as a single reusable interaction layer.

---

## 5. Key Benefits
1.  **Professional Image:** Digital check-in is faster and more modern than paper logs.
2.  **Accuracy:** OCR reduces human error in typing long names or license plates.
3.  **Speed:** Scan-Out takes less than 3 seconds.
4.  **Security:** All guest data is encrypted in the database; only the Visit ID is printed on the physical slip.
5.  **Maintainability:** Decoupled architecture allows for easier updates and consistent UI/UX across features.
