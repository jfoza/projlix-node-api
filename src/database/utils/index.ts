import fs from 'fs';
import path from 'path';

export const readSqlMigrationFile = (fileName: string): string => {
  return fs.readFileSync(
    path.join(
      process.cwd(),
      'src',
      'database',
      'migrations',
      'scripts',
      fileName,
    ),
    'utf8',
  );
};

export const readSqlSeederFile = (fileName: string): string => {
  return fs.readFileSync(
    path.join(process.cwd(), 'src', 'database', 'seeders', 'scripts', fileName),
    'utf8',
  );
};
