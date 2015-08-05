FieldValidator
==============

FieldValidator is a JScript method to simplify custom validation in
Click Portal views.

![FieldValidator](./validator.jpg)


Getting Started
---------------

1. To begin using FieldValidator on your Click store, you will need to open
Entity Manager and navigate to the CustomUtils entity.
2. Inside CustomUtils, create a new perType method named validateField and paste
in the source code.
3. Call validateField from a view validation script hook.

Example
-------

The following is an example of a custom validation implementation using
validateField. The view property _IRBSubmission.customAttributes.happinessDescription_ will be a required field if the boolean property
_customAttributes.isHappy_ is selected true. The validateField method
handles marking the required information via _reportFieldError_ and
throws a validation error when appropriate once all required fields are
marked.

    CustomUtils.validateField(function(validate) {
        var  IS_HAPPY = targetEntity.getQualifiedAttribute("customAttributes.isHappy");
        if (IS_HAPPY === true) {
            validate.field("_IRBSubmission.customAttributes.happinessDescription").isNotNull();
        }

        validate.field("_IRBSubmission.customAttributes.contactEmail").hasValidEmail();
    });


Example Breakdown
-----------------

The first line  invokes
the validateField method and passes in an anonymous function as an
argument. Inside of our anonymous function we will reference
validatefield's validation object via the _validate_ label.

    CustomUtils.validateField(function(validate) {

These lines of code perform conditional validation. When the _isHappy_ question is answered 'Yes', then the _happinessDescription_ must be filled in.

    var  IS_HAPPY = targetEntity.getQualifiedAttribute("customAttributes.isHappy");
    if (IS_HAPPY === true) {
        validate.field("_IRBSubmission.customAttributes.happinessDescription").isNotNull();
    }

This next line performs validation each time the view is changed.

    validate.field("_IRBSubmission.customAttributes.contactEmail").hasValidEmail();

That's all there is to it. The method tracks any failed validations,
reports missing fields to the user, and throws the validation error.
