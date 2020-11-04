describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();
    cy.get('[data-testid=student-name-input]')
      .type("Lydia Miller-Jones");

    cy.get('[data-testid=int-img]')
      .first()
      .click();
    cy.contains(/save/i)
      .click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should edit interview", () => {
      
    cy.get("[alt=Edit]")
      .first()
      .click({force: true});
    cy.get('[data-testid=student-name-input]')
      .type("Lydia Miller-Jones2");

    cy.get('[data-testid=int-img]')
      .first()
      .click();
    cy.contains(/save/i)
      .click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones2");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should cancel an interview", () => {

    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });
    cy.contains(/Confirm/i)
      .click();
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should('not.exist');

    // cy.contains(".appointment__card--show", "Sylvia Palmer");
  });


});