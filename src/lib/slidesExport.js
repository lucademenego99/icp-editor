import redbean from "../assets/redbean.com?url";
import { generateRedbeanFile } from "icp-create-server";

function bufferToHex(buffer) {
    return [...new Uint8Array(buffer)]
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

// Customize the onmessage event
onmessage = async (e) => {
    console.log("MESSAGE RECEIVED:", e);

    const response = await fetch(redbean);
    const file = await response.blob();

    // Get the hex string
    let zipString = bufferToHex(await file.arrayBuffer());

    const generated = await generateRedbeanFile(
        e.data.slides,
        zipString
    );

    postMessage({
        "generated": generated,
    });
}
