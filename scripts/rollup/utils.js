import path from 'path';
import fs from 'fs';

import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

const appDirectory = fs.realpathSync(process.cwd());
export const resolveApp = (relativePath) =>
	path.resolve(appDirectory, relativePath);

const pkgPath = resolveApp('packages');
const distPath = resolveApp('dist/node_modules');

export function resolvePkgPath(pkgName, isDist = false) {
	return isDist ? `${distPath}/${pkgName}` : `${pkgPath}/${pkgName}`;
}

export function getPackageJSON(pkgName) {
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(path, { encoding: 'utf-8' });
	return JSON.parse(str);
}

export function getBaseRollupPlugins({ typescript = {} } = {}) {
	return [cjs(), ts(typescript)];
}
