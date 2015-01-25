FieldValidator
==============

FieldValidator is a JScript module to simplify custom validation in
Click Portal views.

![FieldValidator](./validator.jpg)

Example
-------
*Note: Because of the 'Free Code' restriction that exists in Portal version
6 and below, it is required to include the full source of
fieldValidator.js at the bottom of each validation script.*

The following code would be pasted into the view validation script
hook, which you can find find via the web interface under the 'View' tab of your project.

    var validate = FieldValidator();
    var hasErrors = 0;

    if (targetEntity.getQualifiedAttribute("_ClickAgreement.customAttributes.transgenicAnimals") === true) {
        hasErrors += validate.field("_ClickAgreement.customAttributes.transgenicAnimalsDescription").isNotNull();
    }
    hasErrors += validate.field("_ClickAgreement.customAttributes.descriptionOfProcedures").isNotNull();

    if (hasErrors) {
        throw new Error(-1,"There are " + hasErrors + " missing field(s). Please see below.");
    }

    /* paste fieldValidator.js here */

Example Breakdown
-----------------

These first two lines create an instance of the FieldValidator module and initialize an error counter.

    var validate = FieldValidator();
    var hasErrors = 0;

These lines of code perform conditional validation when the transgenicAnimals question is answered 'Yes', then the transgenicAnimalsDescription question must not be left blank.

    if (targetEntity.getQualifiedAttribute("_ClickAgreement.customAttributes.transgenicAnimals") === true) {
        hasErrors += validate.field("_ClickAgreement.customAttributes.transgenicAnimalsDescription").isNotNull();
    }

This next line performs unconditinal validation. Another way to accompolish this would be to select the required field checkbox in the View Editor. However, staying with a single approach to view validation gives the user a more consistent look and feel.

    hasErrors += validate.field("_ClickAgreement.customAttributes.descriptionOfProcedures").isNotNull();

These last lines check the count of invalid fields that have been detected and will throw an error if that number is greater than 0, resulting in the offending fields being marked. The data on the page will not be persisted until the errors have ben corrected.

    if (hasErrors) {
        throw new Error(-1,"There are " + hasErrors + " missing field(s). Please see below.");
    }
