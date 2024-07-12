# PDF Printing Script

This script processes PDF files from a specified folder, prints them to an installed printer, and then moves the PDFs to a "DONE" folder. Additionally, it purges files in the "DONE" folder that are older than a specified number of days.

## Prerequisites

- Node.js installed on your system
- An installed printer accessible by the system
- `pdf-to-printer` npm package (install with `npm install pdf-to-printer`)

## Setup

1. Clone the repository or download the script.
2. Ensure the necessary folders are created:
   - The "DROP" folder where PDFs will be initially placed.
   - The "DONE" folder where processed PDFs will be moved.

## Configuration

Set the following variables in the script according to your requirements:

### Folder Paths

- **DROP Folder**: The folder where PDF files will be dropped for processing.
- **DONE Folder**: The folder where processed PDF files will be moved.

### Printer Name

- **Printer Name**: The name of the printer you want to use for printing the PDF files.

### Purge Days

- **Number of Days**: The number of days after which files in the "DONE" folder will be purged.

## Script Variables

- `folderPath`: Path to the DROP folder (e.g., `"../../Drops/PDF_Drop"`).
- `doneFolderPath`: Path to the DONE folder (e.g., `"../../Drops/PDF_Done"`).
- `printerName`: Name of the printer to use (e.g., `'Your Printer Name'`).
- `purgeDays`: Number of days to keep files in the DONE folder before purging (e.g., `1`).

## Example

Here is an example configuration:

```javascript
const folderPath = path.join(__dirname, "../../Drops/PDF_Drop"); // Path to the DROP folder
const doneFolderPath = path.join(__dirname, "../../Drops/PDF_Done"); // Path to the DONE folder
const printerName = 'Your Printer Name'; // Name of the printer
const purgeDays = 1; // Number of days to keep files in the DONE folder
