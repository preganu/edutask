const newUser = "sampleuser@email.net";
const todoItem = "Watch it again";

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
                const newItem = "New task"
                cy.get("[id=title]").type(`${newItem}`);
                const itemUrl = "dQw4w9WgXcQ";
                cy.get("[id=url]").type(`${itemUrl}{enter}`);
            }
            cy.contains("New task").click();
        });
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
});

//cy.get('li.todo-item').contains(`${todoItem}`).parent().find('span.checker').click();