#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

let sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function hello() {
  const rainbowTitle = chalkAnimation.rainbow(
    `Qui veut être millionnaire \n Moi^^`
  );
  await sleep();
  rainbowTitle.stop();

  console.log(`
  ${chalk.bgCyanBright("COMMENT JOUER")}
  Je suis un processus sur votre ordinateur
  Si vous vous trompez sur une question, je serai ${chalk.bgCyan("Killed")}
  Alors répondez bien à toutes les questions....

  `);
}

await hello();

async function askName() {
  const answer = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "quel est votre nom ",
    default() {
      return "Player ";
    },
  });
  playerName = answer.player_name;
}
await askName();

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message:
      "Quel est le langage informatique le plus courant utilisé pour écrire les pages web ?\n",
    choices: [
      "HTML (Hypertext Markup Language)",
      "HTTP (Hypertext Transfer Protocol)",
      "Java",
      "JavaScript",
    ],
  });

  return await handleAnswer(
    answers.question_1 == "HTML (Hypertext Markup Language)"
  );
}
async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "À quoi est égal 1 octet ?",
    choices: ["À 8 bytes", "À 8 bits", "À 16 bit", "À 16 bits"],
  });

  return await handleAnswer(answers.question_2 == "À 8 bits");
}
async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "Qu’est-ce qu’un CPU ?",
    choices: [
      "Une carte video",
      "Un disque dur",
      "Un Control Processus Unit",
      "Un processeur",
    ],
  });

  return await handleAnswer(answers.question_3 == "Un processeur");
}
async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "Qu’est-ce qu’une adresse IP ?",
    choices: [
      "Le protocole de communication utilisé sur Internet",
      "Un numéro qui identifie chaque matériel informatique (ordinateur, routeur, imprimante) connecté à un réseau informatique",
      `L’adresse d’un site web, commençant par "http://"`,
      "Un addresse electronique",
    ],
  });

  return await handleAnswer(
    answers.question_4 ==
      "Un numéro qui identifie chaque matériel informatique (ordinateur, routeur, imprimante) connecté à un réseau informatique"
  );
}
async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message:
      "Quelle est la combinaison de touches qui permet de sélectionner tous les fichiers d’un répertoire sous Windows ?",
    choices: ["Ctrl + T", "Alt + T", "Ctrl + C", "Ctrl + A"],
  });

  return await handleAnswer(answers.question_5 == "Ctrl + A");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("vérification de la réponse...").start();
  await sleep();
  if (isCorrect) {
    spinner.success({ text: `good job ${playerName}` });
  } else {
    spinner.error({ text: `Nah U lost ${playerName}` });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Félicitations ${playerName} !\n vous avez gangé  €1 , 0 0 0 , 0 0 0`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await question1();
await question2();
await question3();
await question4();
await question5();
winner();
