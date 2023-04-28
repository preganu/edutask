const newUser = "sampleuser@email.net";
const todoItem = "Watch it again";
const newItem = "New task";
const itemUrl = "dQw4w9WgXcQ";

describe("Logging in to system", () => {
    beforeEach(function(){
        cy.visit("localhost:3000");
        cy.get("[id=email]").type(`${newUser}{enter}`);
        
        //Login or create the new user
        cy.get('h1').then(($h1) => {
            if($h1.text().includes("Your tasks,")){
                cy.log("User already exists");
            }else{
                //Create a new user and a new task for that user
                cy.contains("Have no account yet? Click here to sign up.").click();
                cy.get("[id=email]").clear();
                cy.get("[id=email]").type(`${newUser}{enter}`);
                cy.get("[id=title]").type(`${newItem}`);
                cy.get("[id=url]").type(`${itemUrl}{enter}`);
            }
            cy.viewport(1920, 1080);
            cy.contains("New task").click();
            cy.get('input[placeholder*="Add a new todo item"]').type(`${todoItem}{enter}`);
        });
    })

    //Delete a todo from the task
    it("Delete a todo from the task", () => {
        //Drop the todo
        cy.get('ul.todo-list')
        cy.get('li.todo-item').contains(`${todoItem}`).parent().find('span.remover').as('removeButton');
        cy.get('@removeButton').click().click();
        cy.contains('ul.todo-list', `${todoItem}`).should('not.exist'); 
    })

});