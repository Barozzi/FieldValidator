FieldValidator
==============

FieldValidator is a JScript module to simplify custom validation in
Click Portal views.

![FieldValidator](./validator.jpg)

Example
-------
*Note: Because of the 'Free Code' restriction that exists in Portal version
6 and below, it is required to include the full source of
fieldValidator.js at the bottom of each validation script that it is to
be used in.*

**The following code should be pasted into the view validation script
hook, found in the web interface under the View tab for your project.**

    var validate = FieldValidator();
    var hasErrors = 0;

    if (targetEntity.getQualifiedAttribute("_ClickAgreement.customAttributes.transgenicAnimals") === true) {
        hasErrors += validate.field("_ClickAgreement.customAttributes.transgenicAnimals").isNotNull();
    }
    hasErrors += validate.field("_ClickAgreement.customAttributes.descriptionOfProcedures").isNotNull();

    if (hasErrors) {
        throw new Error(-1,"There are " + hasErrors + " missing field(s). Please see below.");
    }

    /* paste fieldValidator.js here */



