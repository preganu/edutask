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
      })
    
    //Add a todo to the task
    it("Enter description into empty field", () => {
            cy.viewport(1024, 768)
            //Add a todo to the task
            cy.get('input[placeholder*="Add a new todo item"]').type(`${todoItem}`);
            //Click the add button
            cy.contains("Add").click();
            //Check if it is in the list
            cy.get('ul.todo-list').should('contain', `${todoItem}`);
            //Drop the todo
            cy.get('li.todo-item').contains(`${todoItem}`).parent().find('span.remover').click();   
    })
    //The Add button should be disabled if the input is empty
    it("Tries to add new todo with no input", () => {
        cy.viewport(1024, 768);
        cy.get('input[placeholder*="Add a new todo item"]').click();
        cy.contains("Add").should('be.disabled');
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

//cy.get('li.todo-item').contains(`${todoItem}`).parent().find('span.checker').click();