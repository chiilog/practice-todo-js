import TodoList from "./TodoList.js";

new TodoList(
	document.getElementById( 'add-text' ),
	{
		complete: {
			label: '完了',
			classname: 'complete-button',
		},
		del: {
			label: '削除',
			classname: 'delete-button',
		},
		restore: {
			label: '戻す',
			classname: 'restore-button',
		}
	}
);
