from flask import Flask
from flask import jsonify
from flask_cors import CORS
import toolbox
from datetime import date

app = Flask(__name__)
CORS(app)

jso = {"keyy": "val1"}
posts = []


start = "2020-01-01"
end = str(date.today())
end2 = "2020-02-01"

my_operations = toolbox.connexion(toolbox.my_username, toolbox.my_password, start, end2)



@app.route('/board', methods=["GET"])
def get_manager():
    return jsonify(my_operations)


@app.route('/chart', methods=["GET"])
def chart_manager():
    
    data = {}
    myJson = []
    
    for op in my_operations:
        if op['dateOperation'] in data:
            
            if(op['montant'] < 0):
                data[op['dateOperation']] = data[op['dateOperation']] + abs(op['montant'])
        else:
            if(op['montant'] < 0):
                data[op['dateOperation']] = abs(op['montant'])
       
    
    for key in data.keys():
        toWrite = {'key': key.replace('12:00:00 AM', ''), 'value': round(data[key],2)}
        myJson.append(toWrite)
        
               
    return jsonify(myJson)



if __name__ == "__main__":
    app.run()






















