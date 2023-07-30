for d in processed_data/*.json; do
    echo loading $d into database
    mongoimport --db han-blocks --collection entry --jsonArray -u root -p example --authenticationDatabase=admin --file $d
done