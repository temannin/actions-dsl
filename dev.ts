// Define the directory path
const dirPath = "./examples";

// Loop through all files in the directory
for await (const entry of Deno.readDir(dirPath)) {
    // Check if the entry is a file and ends with ".ts"
    if (entry.isFile && entry.name.endsWith(".ts")) {
        // Create a new command to run the TypeScript file
        const command = new Deno.Command("deno", {
            args: ["run", "-A", `${dirPath}/${entry.name}`],
            stdout: "inherit",
            stderr: "inherit",
        });

        // Run the command
        const { success, code } = await command.output();

        // Check if the process succeeded
        if (!success) {
            console.error(`Failed to run ${entry.name}, exit code: ${code}`);
        }
    }
}
