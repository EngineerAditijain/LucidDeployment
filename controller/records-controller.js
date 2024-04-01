
import AWS from 'aws-sdk';

export const createRecordSet = async (request, response) => {
    let {subdomainname,type,TTL,IPaddress}=request.body;
    const route53 = new AWS.Route53();
    const params = {
        ChangeBatch: {
            Changes: [
                {
                    Action: 'CREATE',
                    ResourceRecordSet: {
                        Name: `${subdomainname}.mooo.com`, // Change the DNS name as needed
                        Type: type,
                        TTL: TTL,
                        ResourceRecords: [
                            {
                                Value: IPaddress,
                            },
                        ],
                    },
                },
            ],
        },
        HostedZoneId: 'Z00500433TW4TOQ8B9XXT', // Replace with your hosted zone ID for mooo.com
    };

    try {
        const data = await route53.changeResourceRecordSets(params).promise();
        console.log('Record set created:', data);
        response.status(200).json({
            message:"success"
        })
    } catch (err) {
        console.error('Error creating record set:', err);
        response.status(500).json({
            message:"server down try after some time"
        })
    }
}

export const deleteRecordSet= async(request, response)=> {
    let {Name,Type,TTL,ResourceRecords}=request.body;
    const route53 = new AWS.Route53();
    const params = {
        ChangeBatch: {
            Changes: [
                {
                    Action: 'DELETE',
                    ResourceRecordSet: {
                        Name: Name, // Change the DNS name as needed
                        Type: Type,
                        TTL: TTL,
                        ResourceRecords: ResourceRecords,
                    },
                },
            ],
        },
        HostedZoneId: 'Z00500433TW4TOQ8B9XXT', // Replace with your hosted zone ID for mooo.com
    };

    try {
        const data = await route53.changeResourceRecordSets(params).promise();
        console.log('Record set deleted:', data);
        response.status(200).json({
            message:"Record Deleted Successfully"
        })
    } catch (err) {
        console.error('Error deleting record set:', err);
        response.status(404).json({
            message:"server down try after some time"
        })
    }
}

export const updateRecordSet = async (request, response) => {
    let {Name,Type,TTL,ResourceRecords}=request.body;
    const route53 = new AWS.Route53();
    const params = {
        ChangeBatch: {
            Changes: [
                {
                    Action: 'UPSERT',
                    ResourceRecordSet: {
                        Name: Name, // Change the DNS name as needed
                        Type: Type,
                        TTL: TTL,
                        ResourceRecords: ResourceRecords
                    },
                },
            ],
        },
        HostedZoneId: 'Z00500433TW4TOQ8B9XXT',
    };

    try {
        const data = await route53.changeResourceRecordSets(params).promise();
        console.log('Record set updated:', data);

        // Check if any new records were created
        if (data.ChangeInfo.Status === 'PENDING') {
            console.log('Record set update is pending.');
        }

        response.status(202).json({
            message: "Record Detail Updated Successfully"
        })
    } catch (err) {
        console.error('Error updating record set:', err);
        response.status(500).json({
            message: "Failed to update record detail"
        });
    }
}

 export const  getAllRecordSets=async(request, response)=> {
    const route53 = new AWS.Route53();
    const params = {
        HostedZoneId: 'Z00500433TW4TOQ8B9XXT', // Replace with your hosted zone ID for mooo.com
    };

    try {
        const data = await route53.listResourceRecordSets(params).promise();
        // console.log('All record sets:', data.ResourceRecordSets);
        response.status(200).json({
            records :data.ResourceRecordSets
        })
    } catch (err) {
        console.error('Error getting all record sets:', err);
        response.status(500).json({
            message: "Failed to fetch record detail"
        });
    }
}