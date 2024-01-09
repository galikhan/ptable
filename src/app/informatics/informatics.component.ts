import { Component } from '@angular/core';

import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';


interface FoodNode {
	name: string;
	children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
	{
		name: 'Ввод и вывод данных',
		children: [
			{ name: 'Ввод и вывод данных' },
			{ name: 'Сумма трех чисел' },
			{ name: 'Площать прямоугольного треугольника' },
		]
	},
	{
		name: 'Условия',
		children: [
			{
				name: 'Green',
			}, {
				name: 'Orange',

			},
		]
	},
	{
		name: 'Вычесления',
		children: [
			{
				name: 'Green',
			}, {
				name: 'Orange',

			},
		]
	},
	{
		name: 'Цикл for',
		children: [
			{
				name: 'Green',
			}, {
				name: 'Orange',

			},
		]
	},
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
	expandable: boolean;
	name: string;
	level: number;
}

interface TreeNode {
	id: number;
	name: string;
	children?: TreeNode[];
}

export interface Tile {
	color: string;
	cols: number;
	rows: number;
	text: string;
}

@Component({
	selector: 'app-informatics',
	templateUrl: './informatics.component.html',
	styleUrls: ['./informatics.component.scss']
})
export class InformaticsComponent {
	selection = new SelectionModel<TreeNode>(true, [], true); // Setting the third argument to true enables single selection
	tiles: Tile[] = [
		{ text: 'One', cols: 4, rows: 2, color: 'lightblue' },
		{ text: 'Two', cols: 2, rows: 2, color: 'lightgreen' },
	];
	private _transformer = (node: FoodNode, level: number) => {
		return {
			expandable: !!node.children && node.children.length > 0,
			name: node.name,
			level: level,
		};
	}

	treeControl = new FlatTreeControl<ExampleFlatNode>(
		node => node.level, node => node.expandable);

	treeFlattener = new MatTreeFlattener(
		this._transformer, node => node.level, node => node.expandable, node => node.children);

	dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
	selectedNode!: TreeNode;
	checked = false;

	constructor() {
		this.dataSource.data = TREE_DATA;
	}

	ngOnInit(): void {

	}

	hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


	isSelected(node: TreeNode): boolean {
		return this.selection.isSelected(node);
	}

	onNodeClick(node: TreeNode): void {
		this.selection.toggle(node);
		this.selectedNode = node;
	}

}
