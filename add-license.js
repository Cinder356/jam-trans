// const fs = require('fs');
// const path = require('path');
import fs from "fs";
import path from "path";

// --- НАСТРОЙКИ ---
const AUTHOR = "l1ngus"; // <-- ЗАМЕНИТЕ НА СВОИ ДАННЫЕ
const YEAR = new Date().getFullYear();

// Папки, которые скрипт будет игнорировать
const IGNORE_DIRS = ['node_modules', 'target', 'dist', 'build', '.git', '.next', 'out'];
// Расширения файлов, в которые нужно добавить лицензию
const TARGET_EXTENSIONS = ['.ts', '.tsx', '.rs', '.js', '.jsx'];

const LICENSE_HEADER = `/*
 * Copyright (C) ${YEAR} ${AUTHOR}
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

`;

// Функция для рекурсивного обхода папок
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();

    if (isDirectory) {
      // Пропускаем игнорируемые папки
      if (!IGNORE_DIRS.includes(f)) {
        walkDir(dirPath, callback);
      }
    } else {
      callback(dirPath);
    }
  });
}

// Главная функция
function processFiles() {
  let processedCount = 0;
  let skippedCount = 0;

  walkDir('.', (filePath) => {
    const ext = path.extname(filePath);

    // Если файл имеет нужное расширение
    if (TARGET_EXTENSIONS.includes(ext)) {
      const content = fs.readFileSync(filePath, 'utf8');

      // Проверяем, есть ли уже этот или другой заголовок GPL
      if (content.includes('GNU General Public License') || content.startsWith('/*\n * Copyright')) {
        skippedCount++;
        return; // Пропускаем файл
      }

      // Добавляем заголовок в начало файла
      const newContent = LICENSE_HEADER + content;
      fs.writeFileSync(filePath, newContent, 'utf8');
      processedCount++;
      console.log(`[Добавлено] ${filePath}`);
    }
  });

  console.log(`\nГотово! Обновлено файлов: ${processedCount}. Пропущено (уже есть заголовок): ${skippedCount}.`);
}

processFiles();
