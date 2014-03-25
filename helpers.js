//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
Array.prototype.shuffle = function (){ //v1.0
    for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
};

String.prototype.hashCode = function(){
	// See http://www.cse.yorku.ca/~oz/hash.html		
	var hash = 5381;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)+hash) + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

Number.prototype.mod = function(n) {
	return ((this%n)+n)%n;
}