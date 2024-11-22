import csv

with open("assets.csv", 'r') as file:
    reader = csv.reader(file)

    next(reader)
    for row in reader:
        assetName = row[0]
        assetTag = row[1]
        serial = row[2]
        model = row[3]
        category = row[4]
        status = row[5]
        location = row[6]
        purchaseCost = row[7]
        ATSize = row[8]
        ATManufacturer = row[9]

        #this is where Leo makes them upload to the database
