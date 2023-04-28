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
            //Change viewport so click() can see the whole screen
            cy.viewport(1920, 1080);
            cy.contains("New task").click();
        });
    })

    //Test if an unchecked todoitem can be checked
    it('Todo items can be marked as completed', () => {
      cy.get('.todo-list')
      .first()
      .within(() => {
        const checker = cy.get('.todo-item').get('span').get('.checker')
        checker.parent().find('span.checker.unchecked').click().should('have.class', 'checker checked')
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
});