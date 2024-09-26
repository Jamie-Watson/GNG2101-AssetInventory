# %% NEW FILE Item BEGINS HERE %%

#PLEASE DO NOT EDIT THIS CODE
#This code was generated using the UMPLE 1.34.0.7242.6b8819789 modeling language!
# line 2 "model.ump"
# line 29 "model.ump"
import os

class Item():
    #------------------------
    # MEMBER VARIABLES
    #------------------------
    #Item Attributes
    #------------------------
    # CONSTRUCTOR
    #------------------------
    def __init__(self, aItemName, aItemManufacturer, aSerielNumber, aItemNotes, aExperiationDate, aHolder, aLocation, aDayTaken):
        self._dayTaken = None
        self._location = None
        self._holder = None
        self._experiationDate = None
        self._itemNotes = None
        self._serielNumber = None
        self._itemManufacturer = None
        self._itemName = None
        self._itemName = aItemName
        self._itemManufacturer = aItemManufacturer
        self._serielNumber = aSerielNumber
        self._itemNotes = aItemNotes
        self._experiationDate = aExperiationDate
        self._holder = aHolder
        self._location = aLocation
        self._dayTaken = aDayTaken

    #------------------------
    # INTERFACE
    #------------------------
    def setItemName(self, aItemName):
        wasSet = False
        self._itemName = aItemName
        wasSet = True
        return wasSet

    def setItemManufacturer(self, aItemManufacturer):
        wasSet = False
        self._itemManufacturer = aItemManufacturer
        wasSet = True
        return wasSet

    def setSerielNumber(self, aSerielNumber):
        wasSet = False
        self._serielNumber = aSerielNumber
        wasSet = True
        return wasSet

    def setItemNotes(self, aItemNotes):
        wasSet = False
        self._itemNotes = aItemNotes
        wasSet = True
        return wasSet

    def setExperiationDate(self, aExperiationDate):
        wasSet = False
        self._experiationDate = aExperiationDate
        wasSet = True
        return wasSet

    def setHolder(self, aHolder):
        wasSet = False
        self._holder = aHolder
        wasSet = True
        return wasSet

    def setLocation(self, aLocation):
        wasSet = False
        self._location = aLocation
        wasSet = True
        return wasSet

    def setDayTaken(self, aDayTaken):
        wasSet = False
        self._dayTaken = aDayTaken
        wasSet = True
        return wasSet

    def getItemName(self):
        return self._itemName

    def getItemManufacturer(self):
        return self._itemManufacturer

    def getSerielNumber(self):
        return self._serielNumber

    def getItemNotes(self):
        return self._itemNotes

    def getExperiationDate(self):
        return self._experiationDate

    def getHolder(self):
        return self._holder

    def getLocation(self):
        return self._location

    def getDayTaken(self):
        return self._dayTaken

    def delete(self):
        pass

    # line 11 "model.ump"
    def checkoutItem(self):
        

    # line 12 "model.ump"
    def checkinItem(self):
        

    def __str__(self):
        return str(super().__str__()) + "[" + "itemName" + ":" + str(self.getItemName()) + "," + "itemManufacturer" + ":" + str(self.getItemManufacturer()) + "," + "serielNumber" + ":" + str(self.getSerielNumber()) + "," + "itemNotes" + ":" + str(self.getItemNotes()) + "," + "location" + ":" + str(self.getLocation()) + "]" + str(os.linesep) + "  " + "experiationDate" + "=" + str((((self.getExperiationDate().__str__().replaceAll("  ", "    ")) if not self.getExperiationDate() == self else "this") if not (self.getExperiationDate() is None) else "null")) + str(os.linesep) + "  " + "holder" + "=" + str((((self.getHolder().__str__().replaceAll("  ", "    ")) if not self.getHolder() == self else "this") if not (self.getHolder() is None) else "null")) + str(os.linesep) + "  " + "dayTaken" + "=" + (((self.getDayTaken().__str__().replaceAll("  ", "    ")) if not self.getDayTaken() == self else "this") if not (self.getDayTaken() is None) else "null")





# %% NEW FILE Employee BEGINS HERE %%

#PLEASE DO NOT EDIT THIS CODE
#This code was generated using the UMPLE 1.34.0.7242.6b8819789 modeling language!
# line 15 "model.ump"
# line 34 "model.ump"

class Employee():
    #------------------------
    # MEMBER VARIABLES
    #------------------------
    #Employee Attributes
    #------------------------
    # CONSTRUCTOR
    #------------------------
    def __init__(self, aName, aIdNumber):
        self._idNumber = None
        self._name = None
        self._name = aName
        self._idNumber = aIdNumber

    #------------------------
    # INTERFACE
    #------------------------
    def setName(self, aName):
        wasSet = False
        self._name = aName
        wasSet = True
        return wasSet

    def setIdNumber(self, aIdNumber):
        wasSet = False
        self._idNumber = aIdNumber
        wasSet = True
        return wasSet

    def getName(self):
        return self._name

    def getIdNumber(self):
        return self._idNumber

    def delete(self):
        pass

    def __str__(self):
        return str(super().__str__()) + "[" + "name" + ":" + str(self.getName()) + "," + "idNumber" + ":" + str(self.getIdNumber()) + "]"





# %% NEW FILE Admin BEGINS HERE %%

#PLEASE DO NOT EDIT THIS CODE
#This code was generated using the UMPLE 1.34.0.7242.6b8819789 modeling language!
# line 20 "model.ump"
# line 39 "model.ump"

class Admin():
    #------------------------
    # MEMBER VARIABLES
    #------------------------
    #------------------------
    # CONSTRUCTOR
    #------------------------
    def __init__(self):
        pass

    #------------------------
    # INTERFACE
    #------------------------
    def delete(self):
        pass

    # line 21 "model.ump"
    def addItem(self, item):
        

    # line 22 "model.ump"
    def removeItem(self):
        

    # line 23 "model.ump"
    def login(self):
        

    # line 24 "model.ump"
    def editItemNote(self, text):
