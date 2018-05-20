class newKanbanItem {
	constructor(id, title, content, color, state) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.color = color;
		this.state = state;
	}
	storageSaving(){
		const itemToStorage = {
			'id': this.id,
			'title': this.title,
			'content': this.content,
			'color': this.color,
			'state': this.state
		};
		let storageKeyName = 'simpleKanban-' + this.id;
		sessionStorage.setItem(storageKeyName, JSON.stringify(itemToStorage));

	}
	get addNewItem() {
		this.storageSaving();
		return `<div style="background: ${this.color}" id="item-${this.id}" class="single-kanban-item anim-border ui-sortable-handle"><div class="features flex-container align-flex-start justify-space-between"><div class="color-trigger flex-container align-flex-start justify-flex-start"><button data-color="#fcfcfc" type="button" class="single-color color-picker-0 active">white</button><button data-color="#dd4d4d" type="button" class="single-color color-picker-1">red</button><button data-color="#d44aca" type="button" class="single-color color-picker-2">pink</button><button data-color="#3137e2" type="button" class="single-color color-picker-3">blue</button><button data-color="#29b239" type="button" class="single-color color-picker-4">green</button><button data-color="#cbc036" type="button" class="single-color color-picker-5">yellow</button><button type="button" class="edit-item">Edit item</button></div><div class="btn-container"><button type="button" class="remove-item">Remove item</button></div></div><div class="visible-layer"><h4 class="title">${this.title}</h4><div class="content">${this.content}</div></div><div class="hidden-layer"><input data-type="title" type="text" class="title-input"><textarea data-type="content" rows="3" class="content-input"></textarea><div class="btn-container"><button data-action="save" type="button" class="btn btn-save">Save</button><button data-action="cancel" type="button" class="btn btn-cancel">Cancel</button></div></div></div>`;
	}
}