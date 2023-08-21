window.addEventListener("DOMContentLoaded",() => {
	const rating = new BouncyStarRating("form");
});

class BouncyStarRating {
	rating = null;
	ratings = [
		{id: 1},
		{id: 2},
		{id: 3},
		{id: 4},
		{id: 5}
	];
	pristineClass = "rating--pristine";

	constructor(qs) {
		this.el = document.querySelector(qs);

		this.init();
	}
	init() {
		try {
			this.el.addEventListener("change",this.updateRating.bind(this));
			// stop Firefox from preserving form data between refreshes
			this.el.reset();
			this.el.classList.add(this.pristineClass);
		} catch (err) {
			console.error("Element isn’t a form.");
		}
	}
	updateRating(e) {
		this.el.classList.remove(this.pristineClass);
		// clear animation delays
		Array.from(this.el.querySelectorAll(`[for*="rating"]`)).forEach(el => {
			el.className = "rating__label";
		});

		const ratingObject = this.ratings.find(r => r.id === +e.target.value);
		const prevRatingID = this.rating?.id || 0;

		let delay = 0;
		this.rating = ratingObject;
		this.ratings.forEach(rating => {
			const { id } = rating;
			// add the delays
			const ratingLabel = this.el.querySelector(`[for="rating-${id}"]`);

			if (id > prevRatingID + 1 && id <= this.rating.id) {
				++delay;
				ratingLabel?.classList.add(`rating__label--delay${delay}`);
			}
		});
	}
}