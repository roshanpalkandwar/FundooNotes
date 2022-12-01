import { sendMailToCreateUser } from './user.util';

var amqp = require('amqplib/callback_api');
export const producer=(queue,msg)=>{
    amqp.connect(`amqp://localhost`, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(` [x] Sent ${msg} `);
    });
    
});
}

export const consumerr=(queue)=>{
    amqp.connect(`amqp://localhost`, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`, );

            channel.consume(queue,async function(msg){
            const objectJson=msg.content.toString().toString();
            const objectNormal=JSON.parse(objectJson);
            const Username=objectNormal.Username;
            const Firstname=objectNormal.Firstname;
            const Lastname=objectNormal.Lastname;
            const result=await sendMailToCreateUser(Username,Firstname,Lastname);
            console.log("result============>>>>>><<<<<<<",result);
            
        },
        {
            noAck: true
        });
    });
});
}
consumerr('register');


