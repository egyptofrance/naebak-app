'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { User, MapPin, Briefcase, Users } from 'lucide-react'
import { toast } from 'sonner'

const governorates = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'البحر الأحمر', 'البحيرة', 'الفيوم',
  'الغربية', 'الإسماعيلية', 'المنوفية', 'المنيا', 'القليوبية', 'الوادي الجديد',
  'السويس', 'أسوان', 'أسيوط', 'بني سويف', 'بورسعيد', 'دمياط', 'الشرقية',
  'جنوب سيناء', 'كفر الشيخ', 'مطروح', 'الأقصر', 'قنا', 'شمال سيناء', 'سوهاج'
]

const parties = [
  'مستقل',
  'حزب مستقبل وطن',
  'حزب الوفد',
  'حزب التجمع الوطني التقدمي الوحدوي',
  'حزب المصريين الأحرار',
  'حزب الشعب الجمهوري',
  'حزب المؤتمر',
  'حزب الإصلاح والتنمية',
  'حزب حماة الوطن',
  'حزب العدالة الاجتماعية'
]

export default function CitizenProfilePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    whatsapp: '',
    governorate: '',
    city: '',
    village: '',
    job: '',
    party: '',
    constituency: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error('لم يتم العثور على المستخدم')
        router.push('/auth/login')
        return
      }

      // Update user profile in the database
      const { error } = await supabase
        .from('users')
        .update({
          full_name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          is_profile_complete: true,
          account_status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) {
        console.error('Error updating profile:', error)
        toast.error('حدث خطأ أثناء حفظ البيانات')
        return
      }

      // Update user metadata
      await supabase.auth.updateUser({
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          governorate: formData.governorate,
          city: formData.city,
          village: formData.village,
          job: formData.job,
          party: formData.party,
          constituency: formData.constituency,
          profile_completed: true
        }
      })

      toast.success('تم حفظ بياناتك بنجاح!')
      router.push('/dashboard')

    } catch (error) {
      console.error('Error:', error)
      toast.error('حدث خطأ غير متوقع')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            استكمال البيانات الشخصية
          </h1>
          <p className="text-gray-600">
            يرجى ملء البيانات التالية لإكمال ملفك الشخصي كمواطن
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                البيانات الشخصية
              </CardTitle>
              <CardDescription>
                المعلومات الأساسية الخاصة بك
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">الاسم الأول *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="أدخل الاسم الأول"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">الاسم الأخير *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="أدخل الاسم الأخير"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">رقم التليفون *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="01xxxxxxxxx"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">رقم الواتس آب</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="01xxxxxxxxx"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                المعلومات الجغرافية
              </CardTitle>
              <CardDescription>
                موقعك الجغرافي ومكان الإقامة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="governorate">المحافظة *</Label>
                  <Select value={formData.governorate} onValueChange={(value) => handleInputChange('governorate', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المحافظة" />
                    </SelectTrigger>
                    <SelectContent>
                      {governorates.map((gov) => (
                        <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="city">المدينة/الحي/المركز *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="أدخل المدينة أو الحي"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="village">القرية (إن وجدت)</Label>
                  <Input
                    id="village"
                    value={formData.village}
                    onChange={(e) => handleInputChange('village', e.target.value)}
                    placeholder="أدخل القرية"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional and Political Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                المعلومات المهنية والسياسية
              </CardTitle>
              <CardDescription>
                معلومات حول عملك والانتماء السياسي
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="job">الوظيفة *</Label>
                <Input
                  id="job"
                  value={formData.job}
                  onChange={(e) => handleInputChange('job', e.target.value)}
                  placeholder="أدخل وظيفتك"
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="party">الانتماء الحزبي</Label>
                  <Select value={formData.party} onValueChange={(value) => handleInputChange('party', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحزب أو مستقل" />
                    </SelectTrigger>
                    <SelectContent>
                      {parties.map((party) => (
                        <SelectItem key={party} value={party}>{party}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="constituency">الدائرة الانتخابية (إذا كنت تعلمها)</Label>
                  <Input
                    id="constituency"
                    value={formData.constituency}
                    onChange={(e) => handleInputChange('constituency', e.target.value)}
                    placeholder="أدخل الدائرة الانتخابية"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button 
              type="submit"
              disabled={isLoading || !formData.firstName || !formData.lastName || !formData.phone || !formData.governorate || !formData.city || !formData.job}
              size="lg"
              className="px-8"
            >
              {isLoading ? 'جاري الحفظ...' : 'حفظ البيانات وإكمال التسجيل'}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>
              * الحقول المطلوبة
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
