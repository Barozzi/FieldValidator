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
            this.entity = targetEntity.getQualifiedAttribute(property);
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
        }
    };
    return validator;
}


