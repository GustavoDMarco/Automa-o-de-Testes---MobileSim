/// <reference types="cypress" />

describe('Login — E-Commerce QA', () => {
  let cred

  before(() => {
    cy.fixture('login').then((dados) => {
      cred = dados
    })
  })

  beforeEach(() => {
    cy.abrirModalLogin()
  })

  //  Login com senha incorreta
  it('Deve exibir mensagem de erro com senha incorreta', () => {
    cy.digitarCPF(cred.cpf)
    cy.digitarSenha(cred.senhaInvalida)
    cy.clicarEntrar()

    cy.get('[data-cy="login-user"]', { timeout: 8000 }).should('be.visible')

    // Deve exibir mensagem de erro
    cy.get('.v-application').should(($app) => {
      const texto = $app.text().toLowerCase()
      expect(
        texto.includes('inválido')  ||
        texto.includes('incorreto') ||
        texto.includes('erro')     ||
        texto.includes('não encontrado')
      ).to.be.true
    })
  })
})