import { Command } from "commander";
import inquirer from "inquirer";
import prisma from "@repo/db/client";
import { hash } from "./scrypt";
const program = new Command();

program
  .name("casify cli")
  .description("CLI to perform database operations")
  .version("0.0.1");

program
  .command("create-admin")
  .description("Creates a new admin user")
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of user:",
      },
      { type: "input", name: "email", message: "Enter the email of user:" },
      {
        type: "input",
        name: "password",
        message: "Enter the password for user:",
      },
    ]);
    const { email, password, name } = answers;
    const hashedPassword = await hash(password);

    await prisma.user.upsert({
      where: { email: answers.email },
      create: { email, name, password: hashedPassword, role: "admin" },
      update: { email, name, password: hashedPassword, role: "admin" },
    });
    console.log("Created/Updated user successfully");
  });

program.parse();
