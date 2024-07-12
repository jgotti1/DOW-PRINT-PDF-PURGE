const fs = require("fs");
const path = require("path");
const printer = require("pdf-to-printer");

// ******* SET Varaibles for the script below *****
const folderPath = path.join(__dirname, "../../Drops/PDF_Drop"); // Use relative path or provide absolute path
const doneFolderPath = path.join(__dirname, "../../Drops/PDF_Done"); // Use relative path or provide absolute path
const printerName = 'Edit Page DesignJet T650';
const purgeDays = 1; // Number of days to keep files in the DONE folder

// ***********************************************************************

// Function to process a single PDF file
const processFile = (file, callback) => {
  const filePath = path.join(folderPath, file);
  const doneFilePath = path.join(doneFolderPath, file);

  // Print the PDF file
  printer
    .print(filePath, { printer: printerName })
    .then(() => {
      console.log(`Printed: ${file} on printer: ${printerName}`);

      // Move the PDF file to the done folder
      fs.rename(filePath, doneFilePath, (err) => {
        if (err) {
          console.error("Error moving the file:", err);
        } else {
          console.log(`Moved: ${file} to ${doneFolderPath}`);
        }
        callback();
      });
    })
    .catch((err) => {
      console.error("Error printing the file:", err);
      callback(); // Call the callback even if printing fails
    });
};

// Function to process the PDF files sequentially
const processFiles = (files) => {
  const pdfFiles = files.filter((file) => path.extname(file).toLowerCase() === ".pdf");

  if (pdfFiles.length === 0) {
    console.log("No PDF files found in the folder.");
    process.exit(0);
  }

  let index = 0;

  const processNext = () => {
    if (index < pdfFiles.length) {
      processFile(pdfFiles[index], () => {
        index++;
        processNext();
      });
    } else {
      console.log("All tasks completed. Exiting...");
      process.exit(0);
    }
  };

  processNext();
};



// Function to purge files older than a specified number of days in the DONE folder
const purgeOldFiles = (doneFolderPath, days) => {
  fs.readdir(doneFolderPath, (err, files) => {
    if (err) {
      console.error("Error reading the DONE folder:", err);
      return;
    }

    const now = Date.now();
    const ageInMilliseconds = days * 24 * 60 * 60 * 1000;

    files.forEach((file) => {
      const filePath = path.join(doneFolderPath, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Error getting file stats:", err);
          return;
        }

        if (now - stats.mtimeMs > ageInMilliseconds) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log(`Deleted old file: ${file}`);
            }
          });
        }
      });
    });
  });
};

// Check if the folder is empty
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading the folder:", err);
    process.exit(1);
  }

  if (files.length === 0) {
    console.log("The folder is empty.");
    purgeOldFiles(doneFolderPath, purgeDays); 
    process.exit(0);
  }

  processFiles(files);
});