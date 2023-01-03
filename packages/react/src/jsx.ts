/**
 * ReactElement - JSX
 * @Author: Junting
 * @Date: 2022-12-31 13:13:58
 * @Last Modified by: Junting
 * @Last Modified time: 2023-01-03 14:12:10
 */

import type {
	ElementType,
	Key,
	Props,
	ReactElement,
	Ref,
	Type
} from 'shared/ReactTypes';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';

const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'ReactAnalysis' // 用于标识自行实现
	};
	return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	const props: Props = {};
	let key: Key = null;
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];

		// 单独处理 props 中 ref 和 key 两个自定义属性
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}

		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		// 区分自有和原型上的 property，把原型上的剥离
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	// 区分单个或多个 children 处理方式
	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;
