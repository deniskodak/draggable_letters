import "./style.scss";
import { setupFormListening } from "./form.ts";

const form: HTMLFormElement | null = document.querySelector("#form");
if (!form) throw new Error("Form element is not founded");

const output = document.querySelector<HTMLDivElement>(`#output`);
if (!output) throw new Error("Output element is not founded");

setupFormListening(form, output);
