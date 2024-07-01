/// <reference types="Cypress" />

describe('CENTRAL DE ATENDIMENTO CAC-TAT', function()  {
  beforeEach(function() {
    (cy.visit('./src/index.html'))
  })
  it('VERIFICAR O TÍTULO DA APLICAÇÃO ', function() {

    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = 'TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO TESTE TEXTO LONGO '
    
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Marra')
    cy.get('#email').type('gabriel.marra@actiosoftware.com')
    cy.get('#open-text-area').type(longText, {delay: 0})    //{delay: 0}  === digitar texto longo sem tempo de digitação, instantaneo
    cy.contains('.button', 'Enviar').click()
    
    // .should('be.visible', 'Sucesso')
    cy.get('.success').should('be.visible')
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Marra')
    cy.get('#email').type('gabriel.marra@actiosoftware,com')
    cy.get('#open-text-area').type(`teste`)
    cy.contains('.button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  });

  it('Campo telefone continua vazio quando preenchido com valor não numérico ', () => {
    cy.get('#phone')
      .type('abcef')
      .should('have.value', '')
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Marra')
    cy.get('#email').type('gabriel.marra@actiosoftware.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type(`teste`)
    cy.contains('.button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  });

  it('preenche e limpa os campos nome, sobrenome e email', () => {
    cy.get('#firstName')
      .type('Gabriel')
      .should('have.value', 'Gabriel')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Marra')
      .should('have.value', 'Marra')
      .clear()
      .should('have.value', '') 
    cy.get('#email')
      .type('gabriel.marra@acitosoftware.com')
      .should('have.value', 'gabriel.marra@acitosoftware.com')
      .clear()
      .should('have.value', '')
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('.button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
  });

  it('seleciona um produto (Blog) por seu índice', () => {
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  });

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: "drag-drop" })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]#file-upload')
      .selectFile('@sampleFile')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank') //verificar se o link clicavel vai abrir em outra pagina
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke ('removeAttr', 'target')
      .click()
      
    cy.contains('Talking About Testing').should('be.visible')
  });
})