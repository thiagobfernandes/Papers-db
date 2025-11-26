import { type ClassValue, clsx } from "clsx";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clearNumberFormatting(value: string): string {
  return value.replace(/[^\d]+/g, "");
}

export function isValidCPF(cpf: string) {
  cpf = clearNumberFormatting(cpf);

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

const isLetter = (value: string) => /^[a-zA-Z]+$/.test(value);
const isNumber = (value: string) => /^[0-9]+$/.test(value);

export const formatToMask = (
  value: string,
  mask: string,
  cursorPosition: number
) => {
  if (!mask) return { outputValue: value, newCursorPosition: cursorPosition };
  const normalizedValue = value.replace(/[()\-.\s]/g, "");
  if (!normalizedValue.length) return { outputValue: "", newCursorPosition: 0 };
  const isLetterMask = mask.includes("a") || mask.includes("A");
  const isNumberMask = mask.includes("0");
  let outputValue = "";
  let normalizedValueIndex = 0;

  const maskValues = ["a", "A", "0"];
  let newCursorPosition = cursorPosition;

  if (!maskValues.includes(mask[cursorPosition - 1])) newCursorPosition++;

  for (let i = 0; i < mask.length; i++) {
    if (normalizedValue.length === normalizedValueIndex) break;
    let char = mask[i];

    if (!maskValues.includes(char)) {
      outputValue += char;
      char = mask[i + 1];
      if (maskValues.includes(char)) i++;
    }

    if (mask[cursorPosition] === " ") newCursorPosition++;

    if (char === "0") {
      if (!isNumber(normalizedValue[normalizedValueIndex])) {
        normalizedValueIndex++;
        i--;
        if (!isLetterMask && !isNumberMask) newCursorPosition--;
        continue;
      }
      outputValue += normalizedValue[normalizedValueIndex];
      normalizedValueIndex++;
    } else if (char === "a") {
      if (!isLetter(normalizedValue[normalizedValueIndex])) {
        normalizedValueIndex++;
        i--;
        if (!isLetterMask && !isNumberMask) newCursorPosition--;
        continue;
      }
      outputValue += normalizedValue[normalizedValueIndex].toLowerCase();
      normalizedValueIndex++;
    } else if (char === "A") {
      if (!isLetter(normalizedValue[normalizedValueIndex])) {
        normalizedValueIndex++;
        i--;
        if (!isLetterMask && !isNumberMask) newCursorPosition--;
        continue;
      }
      outputValue += normalizedValue[normalizedValueIndex].toUpperCase();
      normalizedValueIndex++;
    }
  }
  return { newCursorPosition, outputValue };
};

export const transformToMask = (
  masks: string | Array<string>,
  callback?: (event: ChangeEvent<HTMLInputElement>) => void
) => {
  return function (event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const cursorPosition = event.target.selectionStart || 0;

    const mask = Array.isArray(masks)
      ? masks.find(
          (m) =>
            m.replace(/[^0]/g, "").length >= value.replace(/\D/g, "").length
        ) || masks[0]
      : masks;

    const { outputValue, newCursorPosition } = formatToMask(
      value,
      mask,
      cursorPosition
    );
    event.target.value = outputValue;
    event.target.selectionEnd = newCursorPosition;

    if (callback) callback(event);
  };
};
