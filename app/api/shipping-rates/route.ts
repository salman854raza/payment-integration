import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { address, items } = await request.json();
    const response = await axios.post(
      "https://api.shipengine.com/v1/rates",
      {
        rate_options: {
          carrier_ids: ["se-1234567"], // Replace with your ShipEngine carrier ID
        },
        shipment: {
          ship_to: {
            address_line1: address.address,
            city_locality: address.city,
            state_province: address.state,
            postal_code: address.zip,
            country_code: "US",
          },
          ship_from: {
            address_line1: "123 Warehouse St",
            city_locality: "Austin",
            state_province: "TX",
            postal_code: "78701",
            country_code: "US",
          },
          packages: [
            {
              weight: {
                value: items.reduce((acc: number, item: any) => acc + item.quantity * 1, 0), // Assume 1 lb per item
                unit: "pound",
              },
            },
          ],
        },
      },
      {
        headers: {
          "API-Key": process.env.NEXT_PUBLIC_SHIPENGINE_API_KEY,
        },
      }
    );
    return NextResponse.json({ rates: response.data.rate_response.rates });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch shipping rates" }, { status: 500 });
  }
}