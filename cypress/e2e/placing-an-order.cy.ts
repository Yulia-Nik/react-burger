describe('Placing an order', () => {
	beforeEach(() => {
		const email = 'ynikitina97@yandex.ru';
		const password = 'gfhjkm111';

		cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', { fixture: 'ingredients' });
		cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'create-order' });

		cy.visit('http://localhost:3000/login');
		cy.get('input[name="email"]').type(`${email}{enter}`);
		cy.get('input[name="password"]').type(`${password}{enter}`);
	});

	it('Go to home page passes', () => {
		cy.visit('http://localhost:3000');
	});

	it('Create order passes', () => {
		const bunDataTransfer = new DataTransfer();
		cy.get('[data-group-name="bun"] ul li:first').trigger('dragstart', { bunDataTransfer });
		cy.get('.constructor-element[data-name="bun"]').trigger('drop', { bunDataTransfer });

		const fillingDataTranfer = new DataTransfer();
		cy.get('[data-group-name="main"] ul li:first').trigger('dragstart', { fillingDataTranfer });
		cy.get('.constructor-element[data-name="filling"]').trigger('drop', { fillingDataTranfer });

		cy.get('button[name="create-order"]').click();

		cy.get('[data-name="order-number"]').should('have.text', 34479);
	});
});
