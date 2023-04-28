describe("Logging in to system", () => {
  let uid
  let email

  before(function () {
    cy.fixture('example.json')
      .then((user) => {
          cy.request({
              method: 'POST',
              url: 'http://localhost:5000/users/create',
              form: true,
              body: user
          }).then((response) => {
              uid = response.body._id.$oid
              email = user.email
          })
      })
  })

  beforeEach(function() {
    cy.visit("localhost:3000");
    cy.get("[id=email]").type(`${email}{enter}`);
    const newItem = "New task"
    cy.get("[id=title]").type(`${newItem}`);
    const itemUrl = "dQw4w9WgXcQ";
    cy.get("[id=url]").type(`${itemUrl}{enter}`);

    cy.contains("New task").click();
  })

    //Test if an unchecked todoitem can be checked
    it('Todo items can be marked as completed', () => {
      cy.get('.todo-list')
      .first()
      .within(() => {
        const checker = cy.get('.todo-item').get('span').get('.checker')
        checker.parent().find('span.checker.unchecked').click().click().should('have.class', 'checker checked')
      })
    })

    //Test if a checked todoitem can be unchecked
    it('Completed Todo items can be marked as uncompleted', () => {
      cy.get('.todo-list')
      .first()
      .within(() => {
        const checker = cy.get('.todo-item').get('span').get('.checker')
        checker.parent().find('span.checker.checked').click().should('have.class', 'checker unchecked')
      })
    })

    after(function () {
      cy.request({
          method: 'DELETE',
          url: `http://localhost:5000/users/${uid}`
      }).then((response) => {
          cy.log(response.body)
      })
  })
});