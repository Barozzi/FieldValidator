FieldValidator
==============

FieldValidator is a JScript module to simplify custom validation in
Click Portal views.

![FieldValidator](./validator.jpg)

Example
=======
Because of the 'Free Code' restriction that exists in Portal version
6 and below, it is required to include the full source of
fieldValidator.js at the bottom of each validation script that it is to
be used in.

    var validate = FieldValidator();
    var hasErrors = 0;

    if (targetEntity.getQualifiedAttribute("_ClickAgreement.customAttributes.transgenicAnimals.customAttributes.creatingATransgenicRodent") === true) {
        hasErrors += validate.field("_ClickAgreement.customAttributes.transgenicAnimals.customAttributes.tAProtocol").isNotNull();
    }
    hasErrors += validate.field("_ClickAgreement.customAttributes.descriptionOfProcedures").isNotNull();

    if(hasErrors) throw new Error(-1,"There are " + hasErrors + " missing field(s). Please see below.");

    /* paste fieldValidator.js here */



