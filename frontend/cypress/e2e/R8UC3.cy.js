describe("Logging in to system", () => {
    let uid
    let email
    const todoItem = "New Task"
  
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
            cy.get('input[placeholder*="Add a new todo item"]').type(`${todoItem}{enter}`);
    })

    //Delete a todo from the task
    it("Delete a todo from the task", () => {
        //Drop the todo
        cy.get('ul.todo-list')
        cy.get('li.todo-item').contains(`${todoItem}`).parent().find('span.remover').as('removeButton');
        cy.get('@removeButton').click();
        cy.contains('ul.todo-list', `${todoItem}`).should('not.exist'); 
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