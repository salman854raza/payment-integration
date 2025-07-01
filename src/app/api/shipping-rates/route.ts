import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { address, weight } = await request.json();

    if (!process.env.SHIPENGINE_API_KEY) {
      return NextResponse.json(
        { error: 'ShipEngine API key not configured' },
        { status: 500 }
      );
    }

    const shipmentData = {
      rate_options: {
        carrier_ids: []
      },
      shipment: {
        ship_to: {
          name: address.name,
          address_line1: address.address,
          city_locality: address.city,
          state_province: address.state,
          postal_code: address.zipCode,
          country_code: address.country || 'US',
        },
        ship_from: {
          name: 'StyleHub Warehouse',
          address_line1: '123 Fashion Ave',
          city_locality: 'New York',
          state_province: 'NY',
          postal_code: '10001',
          country_code: 'US',
        },
        packages: [
          {
            weight: {
              value: weight || 1,
              unit: 'pound',
            },
            dimensions: {
              unit: 'inch',
              length: 12,
              width: 12,
              height: 6,
            },
          },
        ],
      },
    };

    const response = await fetch('https://api.shipengine.com/v1/rates', {
      method: 'POST',
      headers: {
        'API-Key': process.env.SHIPENGINE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shipmentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('ShipEngine API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch shipping rates' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Return mock rates if ShipEngine returns no rates (for demo purposes)
    if (!data.rate_response?.rates || data.rate_response.rates.length === 0) {
      const mockRates = [
        {
          rate_id: 'mock_standard',
          service_code: 'usps_ground_advantage',
          service_name: 'USPS Ground Advantage',
          carrier_friendly_name: 'USPS',
          shipping_amount: {
            amount: '5.99',
            currency: 'USD',
          },
          delivery_days: 5,
        },
        {
          rate_id: 'mock_express',
          service_code: 'usps_priority_mail',
          service_name: 'USPS Priority Mail',
          carrier_friendly_name: 'USPS',
          shipping_amount: {
            amount: '12.99',
            currency: 'USD',
          },
          delivery_days: 3,
        },
        {
          rate_id: 'mock_overnight',
          service_code: 'fedex_overnight',
          service_name: 'FedEx Overnight',
          carrier_friendly_name: 'FedEx',
          shipping_amount: {
            amount: '24.99',
            currency: 'USD',
          },
          delivery_days: 1,
        },
      ];
      
      return NextResponse.json({ rates: mockRates });
    }

    return NextResponse.json({ rates: data.rate_response.rates });
  } catch (error) {
    console.error('Shipping rates error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}