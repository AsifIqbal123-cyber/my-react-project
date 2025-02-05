import fs from "fs";
import path from "path";

const imagesDir = path.join(process.cwd(), "src/images");  // Folder containing images
const outputFile = path.join(process.cwd(), "src/images.js");  // Output file

fs.readdir(imagesDir, (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        return;
    }

    // Filter only image files
    const imageFiles = files.filter(file => 
        [".png", ".jpg", ".jpeg", ".gif", ".webp"].includes(path.extname(file).toLowerCase())
    );

    // Generate the JavaScript file content
    const imports = imageFiles.map((file,index)=> `import img${index} from "./images/${file}";`).join("\n");
    const exports = `const images = [${imageFiles.map((_, index) => `img${index}`).join(", ")}];\n\nexport default images;`;

    const jsContent = `${imports}\n\n${exports}`;
    // Write to images.js
    fs.writeFileSync(outputFile, jsContent);
    console.log("✅ images.js file generated successfully!");
});
