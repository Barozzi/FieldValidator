/*
 * Field Vaidator
 * Written by: Greg Barozzi
 * Field Validator returns a module-like object that simplifies
 * custom validation in Click Portal views. Due to the 'Free code'
 * restriction this source must be included in the validation script
 * hook for each view that requires custom validation.
 */
function FieldValidator() {
    var validator = {
        property: "",
        entity: null,
        field: function(property) {
            this.property = property;
            this.entity = targetEntity.getQualifiedAttribute(property.replace(/^(\w+)\./, ''));
            return this;
        },
        isNull: function() {
            if (this.entity == null) return 0;
            targetEntity.reportFieldError(this.property, "Please provide additional information.");
            return 1;
        },
        isNotNull: function() {
            if (this.entity != null) return 0;
            targetEntity.reportFieldError(this.property, "Please provide additional information.");
            return 1;
        },
        matchesEntity: function(entity) {
            if (this.entity === entity) return 0;
            targetEntity.reportFieldError(this.property, "Please provide additional information.");
            return 1;
        },
        setCountNotZero: function() {
            if (this.entity && this.entity.count() > 0) return 0;
            targetEntity.reportFieldError(this.property, "Please provide additional information.");
            return 1;
        },
        isGreaterThan: function(num) {
            if (this.entity > num) return 0;
            targetEntity.reportFieldError(this.property, "The provided value must be greater than " + num + ".");
            return 1;
        },
        isNumber: function() {
            if (!isNaN(parseInt(this.entity))) return 0;
            targetEntity.reportFieldError(this.property, "The provided value must not contain letters or special characters.");
            return 1;
        },
        isValidEmailFormat: function() {
            if (validateEmail(this.entity)) return 0;
            targetEntity.reportFieldError(this.property, "The provided value must be validly formatted email address.");
            return 1;
            
            function validateEmail(email) { 
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            } 
        }
    };
    return validator;
}
