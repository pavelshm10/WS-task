// src/storage/fileStore.ts
import fs from "fs-extra";
import path from "path";

const FILE_PATH = path.join(__dirname, "../../messages.json");

export async function saveMessageToFile(msg: object) {
  try {
    let existing: object[] = [];
    if (await fs.pathExists(FILE_PATH)) {
      existing = await fs.readJson(FILE_PATH);
    }
    existing.push(msg);
    await fs.writeJson(FILE_PATH, existing, { spaces: 2 });
  } catch (err) {
    console.error("Failed to write message to file:", err);
  }
}

export async function clearMessagesFile() {
  try {
    await fs.writeJson(FILE_PATH, [], { spaces: 2 });
    console.log("Messages file cleared");
  } catch (err) {
    console.error("Failed to clear messages file:", err);
  }
}
