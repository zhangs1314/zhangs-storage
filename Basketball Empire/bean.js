var continentId = 0, nationId = 0, clubId = 0, continents = new Array (), nations, clubs;
function Continent (name) {
	this.Id = ++ continentId;
	this.Name = name;
	this.Nations = new Array ();
	continents.push (this);
}
function Nation (name, continent) {
	this.Id = ++ nationId;
	this.Name = name;
	this.Continent = continent;
	this.Clubs = new Array ();
	this.Continent.Nations.push (this);
}
function Club (name, nation) {
	this.Id = ++ clubId;
	this.Name = name;
	this.Nation = nation;
	this.Nation.Clubs.push (this);
}