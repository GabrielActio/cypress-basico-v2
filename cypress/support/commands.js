Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {    
  cy.get('#firstName').type('Gabriel')
  cy.get('#lastName').type('Marra')
  cy.get('#email').type('gabriel.marra@actiosoftware.com')
  cy.get('#open-text-area').type('teste')
  cy.contains('.button', 'Enviar').click()
})