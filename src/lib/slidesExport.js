import redbean from "icp-bundle/dist/base/redbean.com?url";
import { generateRedbeanFile } from "icp-create-server";

/**
 * Convert an ArrayBuffer to a hex string
 * @param {*} buffer The buffer to convert
 * @returns The hex string
 */
function bufferToHex(buffer) {
    return [...new Uint8Array(buffer)]
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

// Customize the onmessage event
onmessage = async (e) => {
    // Fetch the redbean file
    const response = await fetch(redbean);
    const file = await response.blob();

    // Get the hex string
    let zipString = bufferToHex(await file.arrayBuffer());

    // Generate the new redbean file exposing the slides
    const generated = await generateRedbeanFile(
        e.data.slides,
        zipString
    );

    // Send the generated redbean file to the main thread
    postMessage({
        "generated": generated,
    });
}
