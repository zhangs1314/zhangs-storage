function ZhangsSelect () {
	var closure = this, name = "zhangsSelect", title = "zhangsTable";
	this.Layer = document.createElement ("div");
	this.Hidden = document.createElement ("input");
	this.Link = document.createElement ("a");
	this.Arrow = document.createElement ("input");
	this.Table = document.createElement ("table");
	this.CurrentIndex = 0;
	this.CurrentValue = "";
	this.Hidden.type = "hidden";
	this.Link.style.cursor = "default";
	this.Link.className = "content";
	this.Arrow.type = "button";
	this.Arrow.style.width = 20;
	this.Arrow.style.padding = 0;
	this.Arrow.style.backgroundColor = "#00ffff";
	this.Arrow.value = "▼";
	this.Table.name = name;
	this.Table.cellPadding = 0;
	this.Table.cellSpacing = 0;
	this.Table.title = title;
	this.Table.style.borderStyle = "solid";
	this.Table.style.borderWidth = 1;
	this.Table.bgColor = "#ffffff";
	this.Table.style.position = "absolute";
	this.Table.style.zIndex = 1;
	this.Table.style.display = "none";
	this.Table.style.maxHeight = 350;
	this.Table.style.overflow = "auto";
	this.Layer.style.borderStyle = "solid";
	this.Layer.style.borderWidth = 1;
	this.Layer.style.borderColor = "#000099";
	this.Layer.appendChild (this.Hidden);
	this.Layer.appendChild (this.Link);
	this.Layer.appendChild (this.Arrow);
	this.Layer.appendChild (this.Table);
	function hideTables () {
		var tables = fetchByTitle ("table", title), i, table;
		for (i = 0; i < tables.length; i ++) {
			table = tables [i];
			if (table.name == name) {
				table.style.display = "none";
			}
		}
	}
	function exhibitTable () {
		var boundingClientRect = closure.Layer.getBoundingClientRect (), rows = closure.Table.rows, i, row, cell, hidden;
		hideTables ();
		closure.Table.style.left = boundingClientRect.left;
		closure.Table.style.top = boundingClientRect.top;
		closure.Table.style.display = "block";
		closure.Table.width = Math.max (closure.Table.offsetWidth, closure.Layer.offsetWidth);
		for (i = 0; i < rows.length; i ++) {
			row = rows [i];
			cell = row.cells [0];
			cell.width = closure.Table.width;
			hidden = cell.childNodes [0];
			row.bgColor = hidden.value == closure.CurrentValue ? "#ffff00" : "#ffffff";
			row.role = row.bgColor;
		}
	}
	this.Link.onclick = function () {
		exhibitTable ();
	};
	this.Arrow.onclick = function () {
		exhibitTable ();
	};
	this.checkOption = function (value, text) {
		closure.CurrentValue = value;
		closure.Hidden.value = value;
		closure.Link.innerHTML = text;
		closure.Table.style.display = "none";
	};
	this.occur = function () {
		console.log ("occur");
	};
	this.addOption = function (value, text) {
		var row = closure.Table.insertRow (- 1), cell = row.insertCell (- 1), link;
		cell.innerHTML = "<input type = 'hidden' value = '" + value + "'><a style = 'cursor: default;' class = 'content'>" + text + "</a>";
		link = cell.childNodes [1];
		row.onmouseover = function () {
			var cell, link;
			cell = row.cells [0];
			link = cell.childNodes [1];
			row.bgColor = "#0000ff";
			link.style.color = "#ffffff";
		};
		row.onmouseout = function () {
			cell = row.cells [0];
			link = cell.childNodes [1];
			row.bgColor = row.role;
			link.style.color = "#000000";
		};
		row.onclick = function () {
			closure.CurrentValue = value;
			closure.Hidden.value = value;
			closure.Link.innerHTML = text;
			closure.Table.style.display = "none";
			if (closure.CurrentIndex != row.rowIndex) {
				closure.CurrentIndex = row.rowIndex;
				closure.occur ();
			}
		};
		if (closure.Hidden.value == "") {
			closure.Hidden.value = value;
		}
		if (closure.Link.innerHTML == "") {
			closure.Link.innerHTML = text;
		}
	};
	this.getValue = function () {
		return closure.Hidden.value;
	};
	this.setValue = function (value) {
		var rows = closure.Table.rows, i, row, cell, hidden, link, text;
		closure.CurrentValue = value;
		if (rows.length > 0) {
			for (i = 0; i < rows.length; i ++) {
				row = rows [i];
				cell = row.cells [0];
				hidden = cell.childNodes [0];
				if (hidden.value == value) {
					link = cell.childNodes [1];
					text = link.innerHTML;
					closure.checkOption (value, text);
					break;
				}
			}
		}
	};
	this.clear = function () {
		closure.Hidden.value = "";
		closure.Link.innerHTML = "";
		closure.Table.style.display = "none";
		while (closure.Table.rows.length > 0) {
			closure.Table.deleteRow (0);
		}
	};
	this.getSelf = function () {
		return closure.Layer;
	};
	function concealTable (event, table) {
		var x = event.clientX, y = event.clientY, boundingClientRect = table.getBoundingClientRect (), left = Math.round (boundingClientRect.left), top = Math.round (boundingClientRect.top), right = Math.round (boundingClientRect.right), bottom = Math.round (boundingClientRect.bottom);
		if (table.style.display != "none" && ! (x >= left && x <= right && y >= top && y <= bottom)) {
			table.style.display = "none";
		}
	}
	this.concealTables = function (event) {
		var tables = fetchByTitle ("table", title), i, table;
		for (i = 0; i < tables.length; i ++) {
			table = tables [i];
			if (table.name == name) {
				concealTable (event, table);
			}
		}
	};
	document.body.onclick = function (event) {
		closure.concealTables (event);
	};
}