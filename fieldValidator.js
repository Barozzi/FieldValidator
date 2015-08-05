/**
 * GB
 * @name FieldVaidator
 * @author Greg Barozzi
 * @desc
 * # Field Validator returns a module-like object that simplifies
 * # custom validation in Click Portal views. Due to the 'Free code'
 * # restriction this source must be included in the validation script
 * # hook for each view that requires custom validation.
 * @example
 * #
 * # CustomUtils.fieldValidator(function(validate) {
 * #    validate.field("_IRBSubmission.customUtils.myBool").isNotNull();
 * #    if (targetEntity.getQualifiedAttribute("customAttributes.myBool") === true) {
 * #        validate.field.("_IRBSubmission.customAttributes.myString").isNotNull();
 * #    }
 * # });
 * #
 */
function fieldValidator(fn) {
    var sch = ShadowSCH.getRealOrShadowSCH();
    var targetEntity = getProject(sch);
    var validate = Validator();

    if (fn) fn(validate);

    validate.reportErrors();
    //end

    // Validator
    function Validator() {
        var validator = {
            errorCount: 0,
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
                this.errorCount +=1;
            },
            isNotNull: function() {
                if (this.entity != null) return 0;
                targetEntity.reportFieldError(this.property, "Please provide additional information.");
                this.errorCount +=1;
            },
            matchesEntity: function(entity) {
                if (this.entity === entity) return 0;
                targetEntity.reportFieldError(this.property, "Please provide additional information.");
                this.errorCount +=1;
            },
            setCountNotZero: function() {
                if (this.entity && this.entity.count() > 0) return 0;
                targetEntity.reportFieldError(this.property, "Please provide additional information.");
                this.errorCount +=1;
            },
            isGreaterThan: function(num) {
                if (this.entity > num) return 0;
                targetEntity.reportFieldError(this.property, "The provided value must be greater than " + num + ".");
                this.errorCount +=1;
            },
            isNumber: function() {
                if (!isNaN(parseInt(this.entity))) return 0;
                targetEntity.reportFieldError(this.property, "The provided value must not contain letters or special characters.");
                this.errorCount +=1;
            },
            isValidEmailFormat: function() {
                if (validateEmail(this.entity)) return 0;
                targetEntity.reportFieldError(this.property, "The provided value must be validly formatted email address.");
                this.errorCount +=1;
                function validateEmail(email) {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email);
                }

            },
            reportErrors: function() {
                if (this.errorCount > 0) {
                    throw new Error(-1,"There are " + this.errorCount + " missing field(s). Please see below.");
                }
            }
        };
        return validator;
    }

    /** Returns the project. */
    function getProject(sch) {
        var isProject = (sch.getQueryString("Project") != null) ? true : false;
        if (isProject == true) {
            return sch.currentEntity;
        } else {
            return sch.currentEntity.loggedFor;
        }
    }
}
