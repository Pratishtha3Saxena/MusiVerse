from flask import Flask, jsonify,json,request
import sqlite3
from flask_cors import CORS
app = Flask(__name__)


CORS(app)



@app.route('/endpoint', methods=['POST'])
def endpoint():
    data = request.get_json()
    n = data['song_name']
    name=""
    ct=0
    for i in n:
        if(i=='.'):
            break
        else:
            ct=ct+1
    name=n[ct+1:len(n)]
    artist = data['artist']
    dur = data['duration']
    conn = sqlite3.connect('proj.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM data WHERE name='{name}'")
    rows = cursor.fetchall()
    if len(rows) > 0:
        conn.close()
        response = jsonify({'status': 'error', 'message': 'Song already exists in the database.'})
        return response
    else:
        cursor.execute(f"INSERT INTO data (name, artist, duration) VALUES ('{name}', '{artist}', '{dur}')")
        conn.commit()
        conn.close()
        response = jsonify({'status': 'success'})
        return response

@app.route('/api')
def get_data():
    conn = sqlite3.connect('proj.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM DATA')
    data = cursor.fetchall()
    print(data)
    jsonlist=[]
    for i in data:
        jsondict={}
        jsondict['id']=i[0]
        jsondict['artist']=i[1]
        jsondict['duration']=i[2]
        jsonlist.append(jsondict)
    return jsonify(jsonlist)


@app.route('/api/delete',methods=['POST','GET'])
def del_data():
    print(request.json)
    response = {'message': 'Song deleted successfully'}
    id=request.json.get('id')
    print(id)
    conn = sqlite3.connect('proj.db')
    cursor = conn.cursor()
    cursor.execute(f'DELETE FROM DATA WHERE NAME="{id}";')
    conn.commit()
    conn.close()
    return jsonify(response),200
if __name__ == '__main__':
    app.run(debug=True,port=8000)