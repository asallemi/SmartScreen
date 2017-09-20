// display success addition of an entry
toastrSaveDone = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.success('With success','Saving done !');
  }else {
    toastr.success('Avec succès','Sauvegarde fait !');
  }
}
// display success validation of an entry
toastrValidatonDone = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.success('With success','Validation done !');
  }else {
    toastr.success('Avec succès','Validation fait !');
  }
}
// display success save of an update
toastrModificationSaved = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.success('With success','Modification saved !');
  }else {
    toastr.success('Avec succès','Modification enregistrée !');
  }
}
// display success validation of an update
toastrModificationValidated = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.success('With success','Modification validated !');
  }else {
    toastr.success('Avec succès','Modification validée !');
  }
}
// display authorization success
toastrAuthorizationDone = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.success('With success','Authorization done !');
  }else {
    toastr.success('Avec succès','Autorisation fait !');
  }
}
// display success delete of an entry
toastrSuppression = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.success('With success','Suppression done !');
  }else {
    toastr.success('Avec succès','Suppression done !');
  }
}
// display access denied msg
toastrWarningAccessDenied = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.warning('Access denied','You are not the inputter of this entry !');
  }else {
    toastr.warning('Accès refusé', "Vous n'êtes pas le saisisseur de cette entrée !");
  }
}
// display warning msg in case deleting company
toastrWarningDeletingCompany = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.warning('You should delete clients and users before this action');
  }else {
    toastr.warning("Vous devez supprimer les clients et les utilisateurs avant cette action");
  }
}
// display warning msg in case of article authorization
toastrWarningArticleAuthorization = function (articleTitle){
  if(Session.get("UserLogged").language == "en"){
    toastr.warning('You have to complete all information before the authorization!', articleTitle);
  }else {
    toastr.warning('Vous devez compléter tous les informations de l\'articles avant l\'autorisation!', articleTitle);
  }
}
// display msg in case of content assigned
toastrContentAssigned = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.success('With success','Content assigned !');
  }else {
    toastr.success('Avec succès','Affectation de contenu fait !');
  }
}
// display msg in case of booking authorized
toastrBookingAuthorized = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.success('With success','Reservation authorized !');
  }else {
    toastr.success('Avec succès','Réservation est autorisée !');
  }
}
toastrSlotUpdateCancled = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.success('With success','Slot update is cancled !');
  }else {
    toastr.success('Avec succès','Modification de créneau est annulée !');
  }
}
toastrSlotBooked = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.success('With success','Your slots are booked now!');
  }else {
    toastr.success('Avec succès','Votre créneaux ont réservés maintenant !');
  }
}
toastrPackageUploaded = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.success('Uploaded with success !', "Package ");
  }else {
    toastr.success('téléchargé avec succès !', "Pakage ");
  }
}
toastrPackageUploadedProblem = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.error('Is already exist or the name contains a space !', "Package ");
  }else {
    toastr.error('Le paquet existe déjà ou le nom contient un espace !', "Package ");
  }
}
toastrPackageNotAuthorized = function (packageName){
  if(Session.get("UserLogged").language == "en"){
    toastr.error('Not authorized', packageName);
  }else {
    toastr.error('Non attribué !', packageName);
  }
}
toastrPackageAuthorized = function (packageName){
  if(Session.get("UserLogged").language == "en"){
    toastr.success('Authorized with success !', packageName);
  }else {
    toastr.success('Attribué avec succès !', packageName);
  }
}
toastrPackageAssigned = function (packageName){
  if(Session.get("UserLogged").language == "en"){
    toastr.success('Assigned with success !', packageName);
  }else {
    toastr.success('Attribué avec succès !', packageName);
  }
}
toastrPackageAlreadyAssigned = function (packageName){
  if(Session.get("UserLogged").language == "en"){
    toastr.error('Already assigned !', packageName);
  }else {
    toastr.error('Est déja attribué !', packageName);
  }
}
toastrContentDeleted = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.success('With success','Content deleted !');
  }else {
    toastr.success('Avec succès','Contenu supprimé !');
  }
}
toastrContentAuthorized = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.success('With success','Content authorized !');
  }else {
    toastr.success('Avec succès','Contenu autorisé !');
  }
}
toastrFirmwareAuthorized = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.error('Package must assign at least one screen !');
  }else {
    toastr.error('Le paquet doit etre assigner au moins à un écran !');
  }
}
// display warning msg in case of no slot selected
toastrNoSlotSelected = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.warning('You have to select a slot before validation !');
  }else {
    toastr.warning('Vous devez sélectionner un créneau avant la validation !');
  }
}
// display warning msg in case of user would adding new currency and it s the pivot (where there is an pivot)
toastrCurrencyPivotAlreadyExist = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.warning("This currency couldn't be a pivot, because there is already one !");
  }else {
    toastr.warning('Cette devise ne peut pas être un pivot, car il existe déjà un !');
  }
}

toastrOptionInUse = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.error("This OPTION is in use, you couldn't delete it for now. Please check your NOT AUTHORIZED contracts !");
  }else {
    toastr.error("Cette OPTION est utilisée, vous ne pouvez pas la supprimer pour l'instant. Veuillez vérifier vos contrats NON AUTORISES! !");
  }
}
toastrStillClientNotSelected = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.error("Clients number in the contract configuration aren't the same number of clients selected !");
  }else {
    toastr.error("Le numéro de client dans la configuration du contrat n'est pas le même nombre de clients sélectionnés !");
  }
}
toastrContractClientRepeated = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.error("There is at least a client repeated, please verify clients selected !");
  }else {
    toastr.error("Il y a au moins un client répété, vérifiez les clients sélectionnés !");
  }
}
toastrContractTypeRequired = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.error("Contract type is required !");
  }else {
    toastr.error("Le type de contrat est requis !");
  }
}
toastrContractDatesRequired = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.error("Contract start date and end date are required !");
  }else {
    toastr.error("La date de début du contrat et la date de fin sont requises !");
  }
}
toastrContractAtLeastOneArticles = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.error("You should select at least an article !");
  }else {
    toastr.error("Vous devez sélectionner au moins un article !");
  }
}
toastrContractDatesInvalid = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.error("Start date or end date are invalid dates !");
  }else {
    toastr.error("La date de début ou la date de fin sont des dates non valides !");
  }
}
toastrContractStartDateAndEndDateInvalid = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.error("Start date is greater than end date of this contract !");
  }else {
    toastr.error("La date de début est supérieure à la date de fin de ce contrat !");
  }
}
toastrCanootHavingTwoPivotLanguage = function (){
  if(Session.get("UserLogged").language == "en"){
    toastr.warning("There is already a pivot language !");
  }else {
    toastr.warning("Il existe déjà un langage pivot !");
  }
}
